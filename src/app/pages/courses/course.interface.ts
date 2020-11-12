import { Bootcamp } from '../bootcamps/bootcamp.interface';

export interface Course {
  title?: String;
  weeks?: String;
  tuition?: String;
  minimumSkill?: String;
  desscholarshipAvailablecription?: Boolean;
  createdAt?: Date;
  description?: String;
  bootcamp?: Bootcamp;
}
