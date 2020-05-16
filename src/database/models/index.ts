import user from './user';

interface IModel {
    [key: string]: any;
}

const models: IModel = {
    User: user,
};

export default models;
