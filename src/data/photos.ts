import type { ImageMetadata } from 'astro';
import akdh from '../assets/photos/AKDH.jpg';
import bensalem23 from '../assets/photos/Bensalem23.jpg';
import eaglesField from '../assets/photos/EaglesFieldPhoto.jpg';
import eaglesPortrait from '../assets/photos/EaglesPortrait.jpg';
import headShot from '../assets/photos/HeadShot.jpg';

export interface Photo {
  src: ImageMetadata;
  alt: string;
}

export const photos = {
  headShot: {
    src: headShot,
    alt: 'Jimmy smiling in a green Eagles quarter-zip jacket',
  },
  eaglesField: {
    src: eaglesField,
    alt: 'Jimmy giving two thumbs up on the field at Lincoln Financial Field after the Eagles won the NFC Championship, confetti in the air',
  },
  eaglesPortrait: {
    src: eaglesPortrait,
    alt: 'Jimmy standing in the end zone of Lincoln Financial Field after an Eagles game in 2023',
  },
  bensalem23: {
    src: bensalem23,
    alt: 'Jimmy receiving the Outstanding Volunteer Award at the 2023 Bensalem FIRST Robotics District Event',
  },
  karate: {
    src: akdh,
    alt: 'Jimmy with the other senseis at Action Karate Drexel Hill after earning the rank of Sensei with his third-degree black belt in American Kempo',
  },
} satisfies Record<string, Photo>;
