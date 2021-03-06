import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateBirthComponent } from './date-birth/date-birth.component';
import { EmailComponent } from './email/email.component';
import { LastnameComponent } from './lastname/lastname.component';
import { PasswordComponent } from './password/password.component';
import { RepeatPasswordComponent } from './repeat-password/repeat-password.component';
import { SkillLevelComponent } from './skill-level/skill-level.component';
import { TelephoneComponent } from './telephone/telephone.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { NameComponent } from './name/name.component';
import { ProfileSelectionComponent } from './profile-selection/profile-selection.component';
import { PointsComponent } from './points/points.component';
import { MoneyComponent } from './money/money.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    TranslateModule
  ],
  declarations: [
    DateBirthComponent,
    EmailComponent,
    NameComponent,
    LastnameComponent,
    PasswordComponent,
    RepeatPasswordComponent,
    SkillLevelComponent,
    TelephoneComponent,
    ProfileSelectionComponent,
    PointsComponent,
    MoneyComponent
   ],
  exports: [
      DateBirthComponent,
      EmailComponent,
      NameComponent,
      LastnameComponent,
      PasswordComponent,
      RepeatPasswordComponent,
      SkillLevelComponent,
      TelephoneComponent,
      ProfileSelectionComponent,
      PointsComponent,
      MoneyComponent
  ]
})
export class InputsModule { }
