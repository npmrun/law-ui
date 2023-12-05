## 效果

<script setup>
    import { ButtonMore, ButtonMoreItem } from "law-ui";
</script>

<ButtonMore text="ButtonPlus" type="primary" @click="console.log">
    <ButtonMoreItem :itemKey="0" @click="console.log">阿萨大</ButtonMoreItem>
    <ButtonMoreItem :itemKey="1" @click="console.log">阿萨大 22</ButtonMoreItem>
</ButtonMore>

<LawAntEmpty layout="fixed"></LawAntEmpty>
