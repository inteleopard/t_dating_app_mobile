import navigationService from '../services/navigationService';

export function openUserProfile(user) {
  navigationService.navigate('SingleUserScreen', {
    title: user.name,
    userId: user.id,
  });
}

export function sagaResolver(resolver, res) {
  const {data, status} = res || {};

  if (data || status?.toString()[0] === '2') {
    if (typeof resolver?.resolve === 'function') {
      resolver.resolve(data);
    }
    return data;
  } else {
    if (typeof resolver?.reject === 'function') {
      return resolver.reject();
    }
  }
}

