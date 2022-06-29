import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

//imports
import { FormsModule } from '@angular/forms';

//Providers
import { PieDataService } from './services/pie-data.service';
import { PieCustomDataComponent } from './pie-custom-data/pie-custom-data.component';
import { MindmapComponent } from './mindmap/mindmap.component';
import { JsmindComponent } from './jsmind/jsmind.component';

@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    PieCustomDataComponent,
    MindmapComponent,
    JsmindComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [PieDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
