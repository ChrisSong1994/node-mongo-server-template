import mongoose from 'mongoose';
import dbConfig from './config';
import models from './models';
import logger from '../utils/logger';

const dbURL = dbConfig.db_url + dbConfig.db_name; // 数据库连接地址

class Db {
    static instance: any;
    public mongoConnection: any;
    /*单例模式  多次实例化实例不共享的问题*/
    static getInstance() {
        if (!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }

    constructor() {
        this.mongoConnection = null;
        this.connect();
    }

    connect = async () => {
        try {
            await mongoose.connect(dbURL, { useNewUrlParser: true });
            if (!this.mongoConnection) {
                this.mongoConnection = mongoose.connection;
            }

            logger.done('Connection success!');
            // 监听mongoConnection连接断开
            this.mongoConnection.on('connected', (err: any) => {
                err && logger.error('Database connection failure');
            });

            this.mongoConnection.on('error', function (err: any) {
                logger.error('Mongoose connected error ' + err);
            });

            this.mongoConnection.on('disconnected', function () {
                logger.error('Mongoose disconnected');
            });

            process.on('SIGINT', () => {
                this.mongoConnection.close(() => {
                    logger.info('Mongoose disconnected through app termination');
                    process.exit(0);
                });
            });
        } catch (error) {
            logger.error('Mongoose connected error ' + error);
        }
    };

    /**
     * 封装保存函数为一个 promise
     * @param {String} collectionName  表名
     * @param {Object} json            保存的文档
     */
    save = (collectionName: string, json: any) => {
        return new Promise((resolve, reject) => {
            const collectionModel = models[collectionName];
            const collection = new collectionModel(json);
            if (collectionModel) {
                collection.save((err: any, res: unknown) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            } else {
                logger.error('invalid collectionName');
                reject({ msg: 'invalid collectionName' });
            }
        });
    };

    /**
     *  更新数据库
     * @param {String} collectionName  表名
     * @param {Object} conditions      查询条件
     * @param {Object} json            更新的文档
     */
    update = (collectionName: string, conditions: any, json: any) => {
        return new Promise((resolve, reject) => {
            const collectionModel = models[collectionName];
            if (collectionModel) {
                collectionModel.update(
                    conditions,
                    { $set: json },
                    { multi: true, upsert: true },
                    (err: any, res: unknown) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(res);
                        }
                    }
                );
            } else {
                logger.error('invalid collectionName');
                reject({ msg: 'invalid collectionName' });
            }
        });
    };

    /**
     *  删除数据库
     * @param {String} collectionName  表名
     * @param {Object} conditions      查询条件
     */
    remove(collectionName: string, conditions: any) {
        return new Promise((resolve, reject) => {
            const collectionModel = models[collectionName];
            if (collectionModel) {
                collectionModel.deleteOne(conditions, (err: any, res: unknown) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            } else {
                logger.error('invalid collectionName');
                reject({ msg: 'invalid collectionName' });
            }
        });
    }

    /**
     *  查询数据库
     * @param {String} collectionName  表名
     * @param {Object} conditions      查询条件
     * @param {Object} query      分页条件
     * @param {Object} sort      排序条件
     */

    find(collectionName: string, conditions: any, pageQuery: IPageQuery, sort: any) {
        return new Promise((resolve, reject) => {
            const collectionModel = models[collectionName];
            let skipNum = 0;
            let limitNum = 0;
            if (pageQuery) {
                // 需要转number
                limitNum = pageQuery.limit; //一页条数
                skipNum = pageQuery.limit * (pageQuery.page - 1); // 跳转到第几条开始
            }
            if (collectionModel) {
                collectionModel
                    .find(conditions)
                    .sort(sort)
                    .skip(skipNum)
                    .limit(limitNum)
                    .exec((err: any, res: unknown) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(res);
                        }
                    });
            } else {
                logger.error('invalid collectionName');
                reject({ msg: 'invalid collectionName' });
            }
        });
    }

    /**
     *  查询数据库  查询单一
     * @param {String} collectionName  表名
     * @param {Object} conditions      查询条件
     */
    findOne(collectionName: string, conditions: any) {
        return new Promise((resolve, reject) => {
            const collectionModel = models[collectionName];
            if (collectionModel) {
                collectionModel.findOne(conditions, (err: any, res: unknown) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
            } else {
                logger.error('invalid collectionName');
                reject({ msg: 'invalid collectionName' });
            }
        });
    }
}

export default Db.getInstance();
