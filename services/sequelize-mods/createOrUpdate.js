import { Model } from 'sequelize';

// eslint-disable-next-line func-names
Model.createOrUpdate = async function (
  options = {
    defaults: {},
    where: {},
  },
) {
  const rows = await this.findOrCreate(options);

  if (rows && rows.length) {
    const { defaults, ...opt } = options;

    await this.update(defaults, opt);

    return this.findOne({ ...opt });
  }

  return rows[0];
};
