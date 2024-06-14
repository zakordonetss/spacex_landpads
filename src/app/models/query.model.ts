export interface IQuery<T> {
  $or?: Array<IQueryOr<T>>;
}

export type IQueryOr<T> = {
  [key in keyof T]?: IQueryOrValue;
};

export interface IQueryOrValue {
  $regex: string;
  $options: 'i';
}
