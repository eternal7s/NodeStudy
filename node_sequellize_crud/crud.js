const {User, Comment, sequelize} = require('./models');
const {Op} = require('sequelize');
/*
User.create({
    name: 'song',
    age: 37,
    married: true,
    comment: '자기소개1'
});
*/

/*
User.findAll({}).then(data => {console.log(data.map(value => value.dataValues))});

User.findOne().then(data => console.log(data.dataValues));

User.findAll({
    attributes: ['name', 'married']
}).then(data => console.log(data.map(v => v.dataValues)));

User.findAll({
    attributes: ['name', 'married'],
    where: {
        married: true,
        age: { [Op.gt]: 30}
    }
}).then(data => console.log('조건: ', data.map(v => v.dataValues)));

User.findAll({
    attributes: ['name', 'id'],
    where: {
       [Op.or]: [{married: false}, {age: {[Op.gt]: 30}}]
    }
}).then(data => console.log('OR: ', data.map(v => v.dataValues)));

User.findAll({
    attributes: ['name', 'age'],
    order: [['age', 'ASC']]
}).then(data => console.log('order: ', data.map(v => v.dataValues)));

User.findAll({
    attributes: ['name', 'id', 'age'],
    order: [['age', 'DESC']],
    limit: 1
}).then(data => console.log('limit1: ', data.map(v => v.dataValues)));

User.findAll({
    attributes: ['name', 'id', 'age'],
    order: [['age', 'DESC']],
    limit: 1,
    offset: 1
}).then(data => console.log('offset1: ', data.map(v => v.dataValues)));


User.update({
    comment: '바꿀내용10000'
}, {
    where: {id: 3}
}).then(()=>
    User.findAll({}).then(data => {console.log(data.map(value => value.dataValues))})
);
User.destroy({
    where: {id: 3}
}).then(()=>
    User.findAll({}).then(data => {console.log(data.map(value => value.dataValues))})
);
(async () => {
    const user =  await User.findOne({
    include: [{
        model: Comment,
        where: {id: 1},
        attributes: ['id', 'comment']
    }]
});
console.log('코멘트', user.Comments.map(v => v.dataValues));
})();

(async () => {
const user =  await User.findOne({});
// const comments = await user.getAnswers();
const comments = await user.getComments(
    {where: {id: 1}, attributes: ['id', 'comment', 'commenter']}
);
console.log('코멘트2', comments.map(v => v.dataValues));
})();

(async () => {
    const user = await User.findOne({});
    const comment = await Comment.create({
        comment:'하하하',
        commenter: 1
    });
    await user.addComment(comment);
    console.log('추가', comment);
})()
*/
(async ()=> {

    const [result, metadata] = await sequelize.query('SELECT * FROM comments');
    console.log(result, metadata);
})()



