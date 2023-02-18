<template>
  <el-aside class="side-nav lll-flex lll-flow-column">
    <div class="side-chat-list">
      <div class="lll-flex lll-align-items-center create-chat" @click="debounceAddQuestion">
        <i class="fa fa-plus"></i>
        <span>New chat</span>
      </div>
      <el-select v-model="value" class="chat-select" placeholder="请选择">
        <el-option
            v-for="item in questionList"
            :key="item.id"
            :label="item.question"
            :value="item.question"
        >
        </el-option>
      </el-select>
      <template v-for="(v, k) in questionList">
        <div class="side-list-item lll-flex lll-align-items-center" :key="k" :class="index === k ? 'active' : ''">
          <div class="item-main lll-flex lll-align-items-center" @click="selectQuestion(k)">
            <i class="fa fa-envelope-o"></i>
            <input v-if="nameIndex === k" type="text" class="name-input" v-model.trim="newName" @blur="changeQuestion(k)"/>
            <span v-if="nameIndex !== k">{{ v.question }}</span>
          </div>
          <i class="fa fa-pencil" @click="editQuestion(k, v.question)"></i>
          <i class="fa fa-close" @click="deleteQuestion(v.id)"></i>
        </div>
      </template>
    </div>
    <div class="side-set-list">
      <div class="side-list-item lll-flex lll-align-items-center">
        <div class="item-main lll-flex lll-align-items-center">
          <i class="fa fa-user-o"></i>
          <span>{{ $store.state.user.name }}</span>
        </div>
      </div>
      <div class="side-list-item lll-flex lll-align-items-center">
        <div class="item-main lll-flex lll-align-items-center">
          <i class="fa fa-sign-out"></i>
          <span>Log out</span>
        </div>
      </div>
    </div>
  </el-aside>
</template>

<script>
import Utils from '@/util/utils'
import Api from '@/api/api'

export default {
  name: 'side-nav',
  data () {
    return {
      questionList: [],
      index: null,
      nameIndex: null,
      newName: '',
      value: ''
    }
  },
  beforeMount () {
    this.utils = Utils
    this.getQuestionList()
    this.$store.state.user.name = 'user Name'
    this.$store.state.user.times = 900
    this.debounceAddQuestion = this.utils.debounce(this.addQuestion, 200)
  },
  methods: {
    getQuestionList () {
      this.questionList = [{
        id: 1,
        question: '机器人学习时间'
      }, {
        id: 2,
        question: 'newChat'
      }]
    },
    selectQuestion (k) {
      this.index = k
      this.value = this.questionList[k].question
      this.$store.commit('setQuestionId', this.questionList[k].id)
    },
    addQuestion () {
      this.questionList.push({
        question: 'newChat'
      })
    },
    editQuestion (k, question) {
      this.nameIndex = k
      this.newName = question
    },
    changeQuestion (k) {
      if (this.newName === '' || this.newName === this.questionList[k].question) {
        this.newName === ''
        this.nameIndex = null
      } else {
        // 修改名字
        this.getQuestionList()
        this.nameIndex = null
      }
    },
    deleteQuestion (id) {
      console.log('deleteQuestion', id)
    }
  }
}
</script>
<style lang="scss" scoped>
.side-nav {
  box-sizing: border-box;
  padding: 8px;

  .create-chat {
    width: 100%;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid rgb(46, 47, 49);
    color: #ffffff;
    box-sizing: border-box;
    padding: 1px 20px;
    height: 40px;

    > i {
      font-size: 12px;
      margin: 0 10px 0 0;
    }

    > span {
      font-size: 16px;
      line-height: 1.2;
    }
  }

  .chat-select {
    display: none;

    input {
      border: #343543;
      background-color: #343543;
      color: #ffffff;
    }
  }

  .side-list-item {
    background-color: transparent;
    cursor: pointer;
    box-sizing: border-box;
    padding: 0 15px 0 0;
    color: #ffffff;

    i {
      font-size: 14px;
      cursor: pointer;
    }

    span {
      font-size: 14px;
      line-height: 1.2;
    }

    > i {
      margin-left: 8px;
    }

    .item-main {
      flex: 1 0;
      width: 0;
      padding: 10px 0 10px 15px;

      > i {
        margin: 0 8px 0 0;
      }

      > span {
        flex: 1 0;
        width: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    &:hover,
    &.active {
      background-color: rgb(39, 39, 50);
    }
  }

  .side-chat-list {
    box-sizing: border-box;
    padding: 0 0 20px;
    border-bottom: 1px solid rgb(46, 47, 49);
    flex: 1 0;
    overflow: hidden;
    overflow-y: auto;

    .side-list-item {
      margin: 15px 0 0;
    }
  }

  .side-set-list {
    padding: 10px 0;
  }

  .name-input {
    flex: 1 0;
    width: 0;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #888888;
    background-color: #ffffff;
    outline: none;
    border: none;

    &:focus {
      border: none;
    }
  }
}

@media (max-width: 749px) {
  .side-nav {
    flex-direction: row;

    .chat-select {
      display: inline-block;
    }

    .side-chat-list {
      display: flex;
      align-items: center;
      padding: 0;
      border: none;

      .side-list-item {
        display: none;
      }
    }

    .side-set-list {
      display: flex;
    }

    .create-chat {
      flex: 0 0 135px;
      width: 0;
      margin: 0 10px 0 0;
    }
  }
}
</style>
