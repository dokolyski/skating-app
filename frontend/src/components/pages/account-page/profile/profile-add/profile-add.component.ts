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
import { Skills } from 'api/rest-models/config-models';

/**
 * @description Creates next user profile with limit per user, gather informations about
 * required ```name```, ```lastname```, ```date of birth```, ```skill level```
 */
@Component({
  selector: 'app-profile-add',
  templateUrl: './profile-add.component.html',
  styleUrls: ['./profile-add.component.css']
})
export class ProfileAddComponent implements OnInit {
  readonly limit = 500;
  form = this.fb.group({
    name: NameComponent.controlSchema,
    lastname: LastnameComponent.controlSchema,
    dateBirth: DateBirthComponent.controlSchema,
    skillLevel: SkillLevelComponent.controlSchemaRequired
  });

  serverInputsErrors: { [input: string]: string };
  skillLevelPossibleValues: Skills;

  @Output()
  onSubmit = new EventEmitter<void>();
  @Output()
  onCancel = new EventEmitter<void>();
  @Output()
  onError = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private rest: RestService,
    public lngService: LanguageService,
    private lngErrorService: LanguageErrorService) { }

  ngOnInit() {
    this.rest.do<CONFIG.GET.OUTPUT>(REST_PATH.CONFIG.GET, { templateParamsValues: { key: 'skillLevelPossibleValues' } })
      .subscribe({
        next: (v: string[]) => this.skillLevelPossibleValues = [' ', ...v],
        error: (e: RestError) => this.handleErrors(e, false)
      });
  }

  createProfile() {
    const editBody = this.prepareProfilePayload();

    this.rest.do(REST_PATH.PROFILES.EDIT, { body: editBody })
      .subscribe({
        next: () => this.onSubmit.emit(),
        complete: () => this.onSubmit.emit(),
        error: (e: RestError) => this.handleErrors(e, true)
      });
  }

  private prepareProfilePayload(): PROFILES.EDIT.COMPILATION.INPUT {
    const body = new PROFILES.EDIT.RUNTIME.INPUT();

    const skill = this.form.get('skillLevel').value;

    body.firstname = this.form.get('name').value,
    body.lastname = this.form.get('lastname').value,
    body.birth_date = this.form.get('dateBirth').value,
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
