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
};

module.exports = Mutations;
