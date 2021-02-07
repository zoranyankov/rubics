const cubeService = require('../services/cubeServices');

const isLogged = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
        return;
    }
    next();
}

// const isCubeCreator = (req, res, next) => {
//         cubeService.getOne(req.params._id)
//             .then(cube => {
//                 if (cube.creatorId !== req.user._id) {
//                     // res.redirect(`/cubes/details/${req.params._id}`); // another option
//                     res.redirect(`/cubes`);
//                     return;
//                 }
//                 next();
//             })
//         .catch(err => console.log('Error : ' + err));
//     }

const isCreator = (req, res, next) => {
    const cubeId = req.params.prod_id;
    cubeService.getOne(cubeId)
        .then(cube => {
            if (cube.creatorId !== req.user._id) {
                if ((req.path).match('remove')) {
                    // let prod_id = req.path.split('/')[1]; // first try
                    res.redirect(`/cubes/details/${cubeId}`);
                    return;
                }
                // res.redirect(`/cubes/details/${req.params._id}`); // another option
                res.redirect(`/cubes`);
                return;
            }
            next();
        })
        .catch(err => console.log('Error : ' + err));
}

const isAuthorized = (req, res, next) => {
    if (req.user) {
        res.redirect('/cubes');
        return;
    }
    next();
}

const isSuperUser = (req, res, next) => {
    if (!req.user.superUser) {
        res.redirect('/cubes');
        return;
    }
    next();
}

module.exports = {
    isLogged,
    isAuthorized,
    // isCubeCreator,
    isCreator,
    isSuperUser,
}