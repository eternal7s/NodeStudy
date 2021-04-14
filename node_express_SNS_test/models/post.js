const Squelize = require('sequelize');

module.exports = class Post extends Squelize.Model {
    static init(sequelize) {
        return super.init({
            content: {
                type: Squelize.STRING(140),
                allowNull: false
            },
            img: {
                type: Squelize.STRING(200),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db) {
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
    }
};