<script setup lang="ts">
    import { getAuth } from 'firebase/auth';
    import FormDados from '~/components/form/formDados.vue';
    import FormImage from '~/components/form/formImage.vue';
    import FormMessage from '~/components/form/formMessage.vue';

    onMounted(() => {
    const auth = getAuth()
    if (!auth.currentUser) {
        return navigateTo('/')
    }
    })

    const etapaAtual = ref(0)
    const etapas = [FormImage, FormDados, FormMessage]

    const dadosCompletos = ref({
        imageUrl: '',
        name: '',
        date: '',
        message: ''
    });

    function irParaProximaEtapa(dadosDaEtapa: any) {
        Object.assign(dadosCompletos.value, dadosDaEtapa)
        etapaAtual.value++

        if (etapaAtual.value >= etapas.length) {
            salvarNoBanco()
        }
    }

    async function salvarNoBanco() {
        const auth = getAuth()
        const user = auth.currentUser
        if (!user) {
            alert("Login necessário")
            return
        }
        const token = await user.getIdToken()

        await fetch('@/server/api/messages/create', {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...dadosCompletos.value,
                publicLink: 'https://seusite.com/mensagem/' + crypto.randomUUID(),
                publicLinkQR: '', // você pode gerar aqui se quiser
            })
        })

        alert('Mensagem criada!')
    }

</script>

<template>
  <div>
    <component :is="etapas[etapaAtual]" @proximo="irParaProximaEtapa" />
  </div>
</template>