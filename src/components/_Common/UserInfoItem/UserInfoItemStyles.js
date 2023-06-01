import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  userInfoContainer: {
    flex: 3,
    flexDirection: 'row',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 6,
    position: 'relative',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatar: {
    flex: 1,
    borderRadius: 4,
    width: '100%',
    height: '200%',
    position: 'absolute',
    top: -5,
  },
  online: {
    width: 10,
    height: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 5,
  },
  infoContainer: {
    alignItems: 'flex-start',
    marginLeft: 6,
  },
  username: {
    fontSize: 15,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  birthDate: {
    color: '#8c8c8c',
  },
});
