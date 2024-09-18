import { TagsModel } from '@model';

export type TagsDetailFormModel = Omit<TagsModel, 'id'>;
