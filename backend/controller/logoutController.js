const handleLogout = async (request, response) => {
    const cookies = request.cookies;
    if(!cookies.jwt){
        return response.sendStatus(204);
    }
    response.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure:true });
    return response.sendStatus(204);

};

module.exports = { handleLogout };