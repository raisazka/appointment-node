import CustomerModel from "../model/customer.js"

class CustomerRepository {
    getByID = (id) => {
        return CustomerModel.findOne({
            _id: id
        })
    }
}

export default CustomerRepository