class apihelpper {
  constructor(query, queryStr) {
    this.query = query; //mongoose query
    this.queryStr = queryStr; //req.query
  }
  search() {
    const keyword = this.queryStr.k
      ? {
          name: {
            $regex: this.queryStr.k,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const category = this.queryStr.filter;
    if (!category) return this;
    this.query = this.query.find({ category: category });
    return this;
  }
  pagination() {
    const page = Number(this.queryStr.page) || 1;
    const limit = Number(this.queryStr.limit) || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default apihelpper;
