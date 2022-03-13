<template>
    <section class="preview">
        <div class="preview-content">
            <p class="persone-data" @click="logger">Персональные данные</p>
            <p class="fio" v-if="isEmpty()">{{users.surname}} {{users.name}} {{users.patronymic}}, {{users.age}} {{declOfNum(users.age, ['год', 'года', 'лет'])}}</p>
            <p class="child">Дети</p>
            <div v-if="isEmpty()">
                <div v-if="users.children.length" class="alignment">
                    <p v-for="child in users.children" :key="child.idx" class="child-info">
                        {{child.name}}, {{child.age}} {{declOfNum(child.age, ['год', 'года', 'лет'])}}
                    </p>
                </div>
                <div v-else><p class="child-info">Детей нет</p></div>
            </div>
            
        </div>
    </section>
</template>

<script>
export default {
    computed: {
        users() {
            return this.$store.getters["getUsers"]
        }
    },
    methods: {
        logger() {
            console.log(this.users);
        },
        isEmpty() {
            return Object.keys(this.users).length;
        },
        declOfNum(n, textForms) {
            n = Math.abs(n) % 100; 
            let n1 = n % 10;
            if (n > 10 && n < 20) { return textForms[2]; }
            if (n1 > 1 && n1 < 5) { return textForms[1]; }
            if (n1 == 1) { return textForms[0]; }
            return textForms[2];
        }
    }
}
</script>
