import { createSelector } from '@reduxjs/toolkit';

export const selectUserData = (state) => state.user.user;
export const selectUserTabs = (state) => state.user.tabs;
export const selectUserRequestData = (state) => {
  return {
    id: state.user.user.id,
    company_id: state.user.user.company_id,
    auth_token: state.user.user.auth_token,
  };
};

export const selectViewLink = createSelector(
 [selectUserTabs, (_, tabName) => tabName],
  (tabs, tabName) => {
    const links = tabs.find(tab => tab.name === tabName)?.links;
    if (!links) {
      return null;
    }

    return links.find(link => link.rel === 'self');
  }
);

export const selectEditLink = createSelector(
  [selectUserTabs, (_, tabName) => tabName],
   (tabs, tabName) => {
     const links = tabs.find(tab => tab.name === tabName)?.links;
     if (!links) {
       return null;
     }
     
     return links.find(link => link.rel === 'add');
   }
);