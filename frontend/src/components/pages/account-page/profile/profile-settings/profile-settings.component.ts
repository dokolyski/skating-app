import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestError } from 'api/rest-error';
import { CONFIG, PROFILES } from 'api/rest-types';
import { LanguageService } from 'services/language-service/Language.service';
import { LanguageErrorService, TranslatedErrors } from 'services/languageError-service/LanguageError.service';
import { RestService } from 'services/rest-service/Rest.service';
import * as REST_PATH from 'api/rest-url.json';
import { NameComponent } from 'components/common/inputs/name/name.component';
import { LastnameComponent } from 'components/common/inputs/lastname/lastname.component';
import { DateBirthComponent } from 'components/common/inputs/date-birth/date-birth.component';
import { SkillLevelComponent } from 'components/common/inputs/skill-level/skill-level.component';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from 'services/auth-service/Auth.service';
import { ProfileRequest as Profile } from 'api/rest-models/profile-request';
import { Skills } from 'api/rest-models/config-models';

/**
 * @description Show profiles account settings and allow to change them, , gather informations about
 * required ```name```, ```lastname```, ```date of birth```, ```skill level```
 */
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  form = this.fb.group({
    name: NameComponent.controlSchema,
    lastname: LastnameComponent.controlSchema,
    dateBirth: DateBirthComponent.controlSchema,
    skillLevel: SkillLevelComponent.controlSchemaRequired
  });

  private _profile: Profile;
  set selectedProfile(p: Profile) {
    this._profile = p;

    this.form.get('name').setValue(p.firstname);
    this.form.get('lastname').setValue(p.lastname);
    this.form.get('dateBirth').setValue(p.birth_date);
    this.form.get('skillLevel').setValue(p.skill_level == null ? ' ' : p.skill_level);
  }
  get selectedProfile() {
    return this._profile;
  }

  profiles: Profile[];
  serverInputsErrors: { [input: string]: string };
  skillLevelPossibleValues: Skills;

  set editMode(value: boolean) {
    if (value) {
      this.form.enable();
    } else {
      this.form.disable();
      if (this._profile) {
        this.selectedProfile = this._profile;
      }
    }
  }
  get editMode() {
    return this.form.enabled;
  }

  @Output()
  onSubmit = new EventEmitter<void>();
  @Output()
  onCancel = new EventEmitter<void>();
  @Output()
  onError = new EventEmitter<string>();

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private rest: RestService,
    public lngService: LanguageService,
    private lngErrorService: LanguageErrorService) {
    this.onCancel.subscribe(() => {
      this.editMode = false;
      this.editMode = true;
    });
  }

  ngOnInit() {
    this.editMode = false;

    this.rest.do<CONFIG.GET.OUTPUT>(REST_PATH.CONFIG.GET, { templateParamsValues: { key: 'skillLevelPossibleValues' } })
      .pipe(
        mergeMap((v: string[]) => {
          this.skillLevelPossibleValues = [' ', ...v];
          return this.rest.do<PROFILES.INDEX.OUTPUT>(REST_PATH.PROFILES.GET);
        })
      )
      .subscribe({
        next: data => {
          const indexOwner = data.findIndex(p => p.type === 'OWNER');
          if (indexOwner) {
            data.splice(indexOwner);
          }
          this.profiles = data;
          this.selectedProfile = data[0];
        },
        error: (e: RestError) => this.handleErrors(e, false)
      });
  }

  edit() {
    const editBody = this.prepareProfilePayload();

    this.rest.do(REST_PATH.PROFILES.EDIT, { body: editBody })
      .subscribe({
        next: () => this.onSubmit.emit(),
        complete: () => this.onSubmit.emit(),
        error: (e: RestError) => this.handleErrors(e, true)
      });
  }

  private prepareProfilePayload(): PROFILES.EDIT.INPUT {
    const body: PROFILES.EDIT.INPUT = new Profile();

    const skill = this.form.get('skillLevel').value;

    body.firstname = this.form.get('name').value;
    body.lastname = this.form.get('lastname').value;
    body.birth_date = this.form.get('dateBirth').value;
    body.skill_level = skill.length && skill !== ' ' ? skill : null;

    return body;
  }

  private handleErrors(error: RestError, showServerErrors: boolean) {
    this.lngErrorService.getErrorsStrings(error)
      .subscribe((translation: TranslatedErrors) => {
        if (translation.message) {
          this.onError.emit(translation.message);
        }

        if (showServerErrors && translation.inputs) {
          for (const input of Object.keys(translation.inputs)) {
            for (const c of Object.values(this.form.controls)) {
              const subfm = c as FormGroup;
              if (subfm.contains(input)) {
                subfm.get(input).setErrors({ 'server-error': true });
              }
            }
          }

          this.serverInputsErrors = translation.inputs;
        }
      });
  }
}
