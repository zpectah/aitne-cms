import { TagsModel } from '@model';

export type TagsFormDataModel = Omit<TagsModel, 'id'>;
