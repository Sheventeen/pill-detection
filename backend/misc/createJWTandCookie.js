import jwt from 'jsonwebtoken';

export const setJWTandCookie = async(res, userID) => {
    const JWTToken = jwt.sign({userID}, process.env.JWT, {
        expiresIn: '3d'
    })
    res.cookie('JWTToken', JWTToken, {
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 3*60*60*1000
    })
    return JWTToken;
};
