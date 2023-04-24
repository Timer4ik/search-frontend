import { createStore } from 'vuex'
import { userList } from '@/mock/userList'
import { checkIsEmail, checkIsIp, checkIsNickName, checkIsPhone, checkIsSurnameAndName, getCheckResult } from "@/utils/searchUtils"
import { Type } from "@/utils/searchUtils"

const api = {
  async getUsersByTypedValue(type, value) {
    switch (type) {
      case Type.EMAIL.name:
        return userList().filter((user) => {
          return checkIsEmail(
            user.email.trim().toLowerCase()
          ).handledValue == value
        });
      case Type.PHONE.name:
        return userList().filter((user) => {
          return checkIsPhone(
            user.phone.trim().toLowerCase()
          ).handledValue == value
        });
      case Type.NICKNAME.name:
        return userList().filter((user) => {
          return checkIsNickName(
            user.nickname.trim().toLowerCase()
          ).handledValue == value
        });
      case Type.SURNAME_AND_NAME.name:
        return userList().filter((user) => {
          return checkIsSurnameAndName(
            user.surname_and_name.trim().toLowerCase()
          ).handledValue == value
        });
      case Type.IP.name:
        return userList().filter((user) => {
          return checkIsIp(
            user.ip.trim().toLowerCase()
          ).handledValue == value
        });
    }
    return []
  }
}

const wait = (ms) => new Promise((resolve, reject) => {
  return setTimeout(() => resolve(), ms)
})

export default createStore({
  state: {
    searchTypedValue: null,
    searchList: []
  },
  getters: {
    getSearchList(state) {
      return state.searchList
    },
    getSearchTypedValue(state) {
      return state.searchTypedValue
    }
  },
  mutations: {
    setSearchTypedValue(state, _searchTypedValue) {
      state.searchTypedValue = _searchTypedValue
    },
    setSearchList(state, _searchList) {
      state.searchList = _searchList
    }
  },
  actions: {
    async fetchUserListByType({ state, commit }) {

      const response = await api.getUsersByTypedValue(
        state?.searchTypedValue?.type?.name,
        state?.searchTypedValue?.handledValue
      )

      commit("setSearchList", response)

      return await wait(2000)
    }
  }
})
