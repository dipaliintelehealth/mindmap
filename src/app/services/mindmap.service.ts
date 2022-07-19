import { Injectable } from '@angular/core';
import { IMindMapData } from '../Interfaces/mindmap-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MindmapService {
  private mockData: IMindMapData = {
    id: 'ID_1000991358',
    topic: 'Abdominal Pain',
    perform_physical_exam:
      'Abdomen:Scars;Abdomen:Distension;Abdomen:Tenderness;Abdomen:Lumps;Abdomen:Rebound tenderness;Abdomen:Peristaltic sound;Physical Growth:Sexual Maturation;',
    display_or: 'ପେଟଯନ୍ତ୍ରଣା',
    children: [
      {
        id: 'ID_210551359',
        topic: 'Site',
        display: 'Which part of the abdomen do you feel pain?',
        display_or: 'କୋଉଯାଗାରେ',
        children: [
          {
            id: 'ID_1935801557',
            topic: 'Upper (R) - Right Hypochondrium',
            display_or: 'ଡାହାଣ ଉପରକୁ',
            display_hi: 'ऊपरी (R) – दाहिना हाइपोकॉन्ड्रिअम',
          },
          {
            id: 'ID_845387253',
            topic: 'Upper (C) - Epigastric',
            display_or: 'ନାଭି ଉପରକୁ',
            display_hi: 'ऊपरी (C) - एपीगैस्ट्रिक ',
          },
          {
            id: 'ID_1036073432',
            topic: 'Upper (L) - Left Hypochondrium',
            display_or: 'ବାମ ଉପରକୁ',
            display_hi: 'ऊपरी (L) बायां हाइपोकॉन्ड्रिअम',
          },
          {
            id: 'ID_568631554',
            topic: 'Middle (R) - Right Lumbar',
            display_or: 'ଡ଼ାହାଣ ମଝି',
            display_hi: 'मध्य (R) – दाहिने लम्बर',
          },
        ],
        display_hi: 'पेट के किस भाग में आप दर्द महसूस कर रहे हैं?',
      },
      {
        id: 'ID_1004615569',
        topic: 'Menstrual history',
        display_or: 'ମାସିକିଅା ବିବରଣୀ',
        gender: '0',
        age_min: '8',
        age_max: '120',
        children: [
          {
            id: 'ID_1558745378',
            topic: 'Has not started menstruation',
            display_or: 'ଅାରମ୍ଭ ହେଇନି',
            display_hi: 'मासिक धर्म शुरू नहीं हुआ',
          },
          {
            id: 'ID_518238742',
            topic: 'Is menstruating',
            display_or: 'ମାସିକିଆ ହୋଉ ଛି',
            children: [
              {
                id: 'ID_850736876',
                topic: 'Age at onset ',
                input_type: 'number',
                display_or: 'କେତେ ବୟସରେ',
                display_hi: 'प्रारंभ होने की उम्र',
              },
              {
                id: 'ID_1665118762',
                topic: 'Last menstruation period',
                input_type: 'date',
                display_or: 'ଶେଷଥର କେବେ ହୋଇଥିଲା',
                language: 'LMP',
                display_hi: 'आखरी मासिक धर्म का समय',
              },
            ],
            display_hi: 'मासिक धर्म होता है',
          },
          {
            id: 'ID_1420686231',
            topic: 'Menopause',
            display_or: 'ମାସିକିଅା ବନ୍ଦ',
            children: [
              {
                id: 'ID_745440603',
                topic: 'Age at menopause ',
                input_type: 'number',
                display_or: 'କେବେ ହେଲା',
                display_hi: 'रजोनिवृत्ति (मेनोपॉज) के समय आपकी उम्र',
              },
            ],
            display_hi: 'रजोनिवृत्ति (मेनोपॉज)',
          },
        ],
        display_hi: 'मासिक धर्म का इतिहास',
      },
      {
        id: 'ID_573035068',
        topic: 'Prior treatment sought',
        display:
          'Have you taken any treatment (including self-medication or home remedies) or seen any health provider for this problem before coming here today?',
        display_or:
          'ତମେ ଆଗରୁ କୌଣସି  ପ୍ରାକାର ଔଷଦ ନଇଥିଲ କି? (ନିଜେ ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ଘରୋଇ ଉପଚାର)',
        children: [
          {
            id: 'ID_1763201920',
            topic: 'Yes [Describe]',
            input_type: 'text',
            language: '%',
            display_or: 'ହାଁ (ବର୍ଣନା କର)',
            display_hi: 'हाँ [वर्णन करें]',
          },
          {
            id: 'ID_1226925547',
            topic: 'None',
            display_or: 'କିଛି ନାହିଁ',
            display_hi: 'इनमें से कोई नहीं',
          },
        ],
        display_hi:
          'क्या आपने आज यहां आने से पहले इस तकलीफ के लिए कोई उपचार किया (स्वयं-दवा या घरेलू उपचार सहित) या किसी डॉक्टर को दिखाया है?',
      },
      {
        id: 'ID_1065741634',
        topic: 'Additional information',
        display_or: 'ଅତିରିକ୍ତ ସୂଚନା',
        children: [
          {
            id: 'ID_1894895710',
            topic: '[Enter additional information]',
            input_type: 'text',
            language: '%',
            display_or: 'ଅତିରିକ୍ତ ସୂଚନା ପ୍ରଦାନ କରିବା',
            display_hi: '[अतिरिक्त जानकारी दर्ज करें]',
          },
        ],
        display_hi: 'अतिरिक्त जानकारी',
      },
    ],
    display_hi: 'पेट दर्द ',
  };

  private dataSubject = new BehaviorSubject<IMindMapData>(this.mockData);
  $data = this.dataSubject.asObservable();
  addData(parentNode: IMindMapData, childNode: IMindMapData) {
    if (parentNode) {
      if (!parentNode.children) {
        parentNode.children = new Array<IMindMapData>();
      }
      parentNode.children.push(childNode);
    }
  }
}
