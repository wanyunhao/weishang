import NotifyEvent from './NotifyEvent'

export const Notify = {
    LOGIN_SUCCESS: new NotifyEvent('LOGIN_SUCCESS'), // 登陆成功
    LOGOUT_SUCCESS: new NotifyEvent('LOGOUT_SUCCESS'), // 退出成功
    H5_RELOAD_URL: new NotifyEvent('H5_RELOAD_URL'), //刷新H5页面
    TOKEN_EXPIRED: new NotifyEvent('TOKEN_EXPIRED'), //Token过期
    Refresh_conversation_list: new NotifyEvent('Refresh_conversation_list'),//刷新聊天列表
    Refresh_WX_LQ: new NotifyEvent('Refresh_WX_LQ'),//刷新聊天列表
};

