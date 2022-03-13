<template>
    <section class="form">
        <div class="form-content">
            <form action="">
                <p class="persone-data">Персональные данные</p>
                <div class="fio-inputs">
                    <input type="text" name="name" placeholder="Имя" v-model="user.name">
                    <input type="text" name="surname" placeholder="Фамилия" v-model="user.surname">
                    <input type="text" name="father-name" placeholder="Отчество" v-model="user.patronymic">
                    <input type="number" name="age" placeholder="Возраст" v-model="user.age">
                </div>
                <div class="cheldren-add">
                    <p>Дети (Макс 5)</p>
                    <a @click.prevent="addChildren" :style="maxChild ? 'display: none' : 'display: flex'">+ Добавить ребёнка</a>
                </div>
                <div class="children-content" v-if="hasChildren">
                    <div class="children-inputs" v-for="child in children" :key="child.idx">
                        <input type="text" name="name" placeholder="Имя" v-model="child.name">
                        <input type="number" name="age" placeholder="Возраст" v-model="child.age">
                        <p @click="deleteChild(child.idx)">Удалить</p>
                    </div>
                </div>
                <button type="submit" class="save" @click.prevent="submitForm">Сохранить</button>
            </form>
            <p style="text-align: center; margin-top: 20px; color: red">{{errorMessage}}</p>
        </div>
    </section>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
export default {
    data() {
        return {
            user: {
                name: '',
                surname: '',
                patronymic: '',
                age: '',
                children: []
            },
            errorMessage: ''
        }
    },
    computed: {
        children: {
            set(val) {
                if(!this.maxChild){
                this.user.children.push(val);
                }
            },
            get() {
                return this.user.children;
            }
        },
        hasChildren() {
            return this.children.length
        },
        maxChild(){
            return this.children.length === 5;
        }
    },
    methods: {
        addChildren() {
            this.children = {
                idx: uuidv4(),
                name: '',
                age: ''
            }
        },
        deleteChild(idx){
            let index = this.children.findIndex(item => item.idx == idx);
            this.user.children.splice(index, 1);
        },
        submitForm() {
            if(this.isValidForm()){
                this.user.idx = uuidv4();
                this.$store.dispatch('setUsers', this.user)
                this.user = {
                name: '',
                    surname: '',
                    patronymic: '',
                    age: '',
                    children: []
                }
            } else {
                this.errorMessage = "Заполните форму полностью";
                setTimeout(() => {
                this.errorMessage = ''
                }, 3000)
            }
        },
        isValidForm(){
            let valid = true;
            if(!this.user.name.length || !this.user.surname.length || !this.user.patronymic.length){
                valid = false;
            }

            if(this.children.find(item => item.name.length === 0 || item.age === 0)){
                valid = false;
            }

            return valid
        }
    }
}
</script>
