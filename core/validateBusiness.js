const Branch = require("../models/Branch");
const Business = require("../models/Business");

const getBusinessFromOwner = async (business) => {
    let _business
    let tryBusiness = await Business.findOne({_id: business})
    if(tryBusiness){
        _business = tryBusiness
        return _business
    } 
    // else if(business_id){
    //     _business = await Business.findOne({_id: business_id})
    //     return _business
    // } 
    else {
        return {
            error: true,
            message: 'You don`t own any business'
        }
    }
}

const getBusinessAndBranchFromOperator = async (branch) => {

    let _branch = await Branch.findOne({_id: branch})
    if(_branch){
        return _branch
    } 
    // else if(business_id){
    //     _business = await Business.findOne({_id: business_id})
    //     return _business
    // } 
    else {
        return {
            error: true,
            message: 'You don`t belong to any branch.'
        }
    }
}

const validateBusinessOwner = () => {
    return async function (req, res, next) { 
       
        if(req.user.roles.find(x => x.name === 'Business Owner Role')){
            
            let _business = await getBusinessFromOwner(req.user.business)
            if(_business.error){
                return res.status(403).json({ message: _business.message });
            } else {
                req.user.business = _business
                next();
            } 
            // else {
            //     return res.status(403).json({ message: "You don't have permissions for this resource." });
            // }
            
        } else if(req.user.roles.find(x => x.name === 'Branch Operator Role')){

            let _branch = await getBusinessAndBranchFromOperator(req.user.branch)
            if(_branch.error){
                return res.status(403).json({ message: _branch.message });
            } else {
                req.branch = _branch
                next();
            } 
            // else {
            //     return res.status(403).json({ message: "You don't have permissions for this resource." });
            // }
            

        } else if(req.user.roles.find(x => x.name === 'Administrator Role')){
            next();
        } else {
            return res.status(403).json({ message: "You don't have permissions for this resource." });
        }
    }
} 


module.exports = validateBusinessOwner;