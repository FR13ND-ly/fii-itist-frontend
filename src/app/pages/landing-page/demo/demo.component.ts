import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import tinycolor from 'tinycolor2';
import { AuthService } from '../../../core/services/auth.service';
import { DemoModel } from '../../../core/models/demo.model';

@Component({
  selector: 'lp-demo',
  imports: [NgStyle],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {
  authService = inject(AuthService);
  auth = this.authService.getUserData();

  demos: DemoModel[] = [
    {
      type: "Soft Skills",
      typeColor: '#4caf50',
      speaker: {
        name: "Andrei Popescu",
        imageUrl: "https://example.com/andrei-popescu.jpg"
      },
      title: 'Real Communication Hacks',
      description: 'With over 20 years of experience in leading & developing digital products for businesses ranging from startups to corporations, I assist teams in improving healthy communication, leadership, managing relationships effectively, achieving clarity and enhancing performance. In a mission to provide education and tools for mental health 3.0 - preventive.',
      time: '10:20 - 11:10'
    },
    {
      type: "Soft Skills",
      typeColor: '#4caf50',
      speaker: {
        name: "Andrei Popescu",
        imageUrl: "https://example.com/andrei-popescu.jpg"
      },
      title: 'Community: Your Professional Springboard',
      description: 'Community engagement can actually help your career! Learn how making connections, gaining new skills, and giving back can lead to exciting job opportunities and boost your career.',
      time: '11:20 - 12:10'
    },
    {
      type: "Entrepreneurship",
      typeColor: '#ff9800',
      speaker: {
        name: "Andrei Popescu",
        imageUrl: "https://example.com/andrei-popescu.jpg"
      },
      title: 'Seeds of Foundership',
      description: `I have spent over 15 years working in the industry, most of that time at Amazon, and it took burning out to remember that I can do even more. After taking the time to heal, I started tinkering again, and even birthed and buried a start-up (the first of many, I hope). I've learned in the past year what it takes to be a founder, and most recently I've started to pay that knowledge forward through a series of games called "Fondatori din viitor" aka GGGG. (Founders from the future) What is foundership? And how does that tie into entrepreneurship?... Or relate to a career in tech? Let's chat`,
      time: '12:40 - 13:30'
    }
  ]

  getTextColor(bgColor: string): string {
    return tinycolor(bgColor).darken(30).toHexString();
  }

  getLigherColor(bgColor: string): string {
    return tinycolor(bgColor).lighten(30).toHexString();
  }
}
