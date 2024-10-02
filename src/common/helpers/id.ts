const TypeSymbol = Symbol("type");

export type ID<T> = string & { [TypeSymbol]?: T };
