const errorHandler = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
      const { title, content } = req.body;
      next();
    };
}    

module.exports = errorHandler;