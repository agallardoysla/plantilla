import generic_service from './generic_service';

const url = 'posts/';
const pageSize = 20;

export default {
  list: async (page) => {
    const res = await generic_service.doGet(`${url}?limit=${pageSize}&offset=${page*pageSize}`);
    res.data = res.data.map(post => {
      post.comments.map(c => {
        c.comments = post.comments.filter(_c => _c.original_comment === c.id);
        return c;
      });
      return post;
    });
    console.log(res.data[0]);
    return res;
  },
  get: (id) => generic_service.doGet(`${url}${id}/`),
  edit: (id, newPost) => generic_service.doPut(`${url}${id}/`, newPost),
  create: (newPost) => generic_service.doPost(url, newPost),
  delete: (id) => generic_service.doDelete(`${url}${id}/`),
  getComments: (id) => generic_service.doGet(`${url}${id}/comments/`),
  getReactions: (id) => generic_service.doGet(`${url}${id}/reactions/`),
};
