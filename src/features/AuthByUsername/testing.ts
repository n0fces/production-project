// помимо продакшн кода, который видит непосредственно пользователь, есть код, который нужен для тестов и сторибука
// мы будем создавать для тестовых данных отдельный public api
// использовать эти данные нельзя в продашкн коде
export { loginReducer } from './model/slice/loginSlice';