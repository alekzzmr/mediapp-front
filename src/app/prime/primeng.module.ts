import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';
import { DataViewModule } from 'primeng/dataview';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { PaginatorModule } from 'primeng/paginator';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ], exports: [
    CommonModule,
    SidebarModule,
    MenuModule,
    ButtonModule,
    ToggleButtonModule,
    BreadcrumbModule,
    FieldsetModule,
    CardModule,
    ToolbarModule,
    InputTextModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextareaModule,
    InputMaskModule,
    ToastModule,
    DataViewModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    PanelModule,
    RadioButtonModule,
    FileUploadModule,
    GalleriaModule,
    PaginatorModule,
    OverlayPanelModule
  ]
})
export class PrimengModule { }
