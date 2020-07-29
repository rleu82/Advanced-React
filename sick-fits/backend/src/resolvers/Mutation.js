const Mutations = {
    async createItem(parent, args, ctx, info) {
        //  TODO: Check if they are logged in

        const item = await ctx.db.mutation.createItem(
            {
                data: {
                    ...args,
                },
            },
            info
        );
        console.log(item);
        return item;
    },

    updateItem(parent, args, ctx, info) {
        // Take copy of updates
        const updates = { ...args };
        // remove id from updates
        delete updates.id;
        //run the update method
        return ctx.db.mutation.updateItem(
            {
                data: updates,
                where: {
                    id: args.id,
                },
            },
            info
        );
    },
    async deleteItem(parent, args, ctx, info) {
        const where = { id: args.id };
        // 1. Find Item
        const item = await ctx.db.query.item({ where }, `{id title}`);
        // 2. check if they own that item or have permission
        // 3. delete item
        return ctx.db.mutation.deleteItem({ where }, info);
    },
};

module.exports = Mutations;
