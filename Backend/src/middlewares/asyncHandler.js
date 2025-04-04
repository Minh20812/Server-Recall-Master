// const asyncHandler = (fn) => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch((error) => {
//     res.status(500).json({ message: error.message });
//   });
// };

// export default asyncHandler;

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    next(error); // Chuyển lỗi cho middleware xử lý lỗi tiếp theo
  });
};

export default asyncHandler;
