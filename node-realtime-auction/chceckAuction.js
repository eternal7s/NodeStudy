const {Op} = require('sequelize');

const {Good, Auction, User, sequelize} = require('./models');

module.exports = async () => {
    try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); // 어제 시간
        const targets = await Good.findAll({
            where: {
                SoldId: null,
                createAt: { [Op.lte]: yesterday}
            }
        });
        targets.forEach(async (target) => {
            const success = await Auction.findOne({
                where: {GoodId: target.id},
                order: [['bid', 'DESC']]
            });
            await Good.update({SoldId: success.UserId}, {where: {id: target.id}});
        });
    } catch (error) {
        console.error(error);
    }
}