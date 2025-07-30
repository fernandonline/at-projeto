<script setup lang="ts">
import { Heart, QrCode } from "lucide-vue-next";
import GoogleAuthLogin from "@/components/login/GoogleAuthLogin.vue";
</script>

<template>
  <section class="hero-section position-relative min-vh-100 d-flex align-items-center overflow-hidden" >

    <!-- Floating Hearts -->
    <div class="position-absolute w-100 h-100 pointer-events-none">
      <Heart class="heart-icon heart-pink" style="top:5rem; left:2.5rem; width:24px; height:24px; opacity:0.3; animation: float 6s ease-in-out infinite" />
      <Heart class="heart-icon heart-purple" style="top:8rem; right:4rem; width:16px; height:16px; opacity:0.4; animation: floatDelayed 6s ease-in-out infinite" />
      <Heart class="heart-icon heart-soft" style="bottom:10rem; left:5rem; width:20px; height:20px; opacity:0.25; animation: heartbeat 1.5s infinite" />
      <Heart class="heart-icon heart-pink" style="bottom:15rem; right:3rem; width:28px; height:28px; opacity:0.2; animation: float 6s ease-in-out infinite" />
      <Heart class="heart-icon heart-purple" style="top:50%; left:3rem; width:12px; height:12px; opacity:0.35; animation: heartbeat 1.5s infinite" />
      <Heart class="heart-icon heart-soft" style="top:75%; right:5rem; width:16px; height:16px; opacity:0.3; animation: floatDelayed 6s ease-in-out infinite" />
    </div>

    <div class="container position-relative z-index-10">
      <div class="row align-items-center gy-4">
        <!-- Left Content -->
        <div class="col-lg-6 text-center text-lg-start">
          <h1 class="display-4 fw-bold lh-sm">
            <span class="gradient-text">Crie algo inesquecível</span><br />
            <span class="text-dark">para quem você ama</span>
          </h1>
          <p class="lead text-muted max-w-600 mx-auto mx-lg-0">
            Crie um contador dinâmico do tempo de relacionamento. Compartilhe com o seu amor e faça um
            <span class="text-danger fw-semibold"> presente surpresa inesquecível</span>. Só apontar para o QR Code 💕
          </p>

          <div class="d-flex justify-content-center justify-content-lg-start gap-3 mb-3">
            <button type="button" class="btn btn-romantic btn-xl position-relative overflow-hidden">
              Quero fazer meu site
              <div class="btn-gradient-overlay"></div>
            </button>
          </div>

          <GoogleAuthLogin/>

          <div class="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 text-muted small">
            <Heart class="text-danger heart-beat" style="width:16px; height:16px" />
            <span>Mais de 4.500 casais felizes</span>
            <Heart class="text-danger heart-beat" style="width:16px; height:16px" />
          </div>
        </div>

        <!-- Right Content - QR Code -->
        <div class="col-lg-6 position-relative d-flex justify-content-center align-items-center">
          <div class="position-absolute top-0 end-0 translate-middle-x translate-middle-y z-20">
            <div class="qr-code-box rounded-3 p-3 d-flex justify-content-center align-items-center position-relative">
              <QrCode class="text-purple" style="width:100%; height:100%" />
              <Heart class="position-absolute top-0 end-0 translate-middle heart-pink heart-beat" style="width:24px; height:24px" />
            </div>
          </div>

          <!-- Decorative Background Circles -->
          <div class="decorative-circle circle-1"></div>
          <div class="decorative-circle circle-2"></div>
        </div>
      </div>
    </div>

    <!-- Background Gradient Orbs -->
    <div class="background-orb orb-top"></div>
    <div class="background-orb orb-bottom"></div>

  </section>
</template>

<style scoped>
/* Bootstrap override */
.max-w-600 {
  max-width: 600px !important;
}

/* Gradients */
.gradient-text {
  background: linear-gradient(90deg, #f72585, #720026);
  -webkit-text-fill-color: transparent;
}

/* Button romantic variant */
.btn-romantic {
  color: #720026;
  background-color: #f72585;
  border: none;
  overflow: hidden;
  position: relative;
  transition: color 0.3s ease;
}
.btn-romantic:hover {
  color: #fff;
}
.btn-xl {
  padding: 0.75rem 2rem;
  font-size: 1.25rem;
  font-weight: 600;
  border-radius: 0.75rem;
}
.btn-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(114, 0, 38, 0.2), rgba(247, 37, 133, 0.2));
  transform: translateX(100%);
  transition: transform 0.5s ease;
  border-radius: 0.75rem;
  z-index: 0;
}
.btn-romantic:hover .btn-gradient-overlay {
  transform: translateX(0);
}

/* Heart colors */
.heart-pink {
  color: #f72585;
}
.heart-purple {
  color: #720026;
}
.heart-soft {
  color: #b5838d;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes floatDelayed {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}
.heart-beat {
  animation: heartbeat 1.5s infinite;
}

/* QR Code box */
.qr-code-box {
  width: 160px;
  height: 160px;
  border: 2px dashed rgba(114, 0, 38, 0.5);
  background: rgba(247, 37, 133, 0.1);
  backdrop-filter: blur(5px);
  position: relative;
}

/* Decorative circles */
.decorative-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(20px);
  opacity: 0.2;
  animation: float 6s ease-in-out infinite;
}
.circle-1 {
  width: 100px;
  height: 100px;
  background: linear-gradient(90deg, #720026, #f72585);
  bottom: -3rem;
  left: -3rem;
}
.circle-2 {
  width: 80px;
  height: 80px;
  background: linear-gradient(90deg, #f72585, #720026);
  top: -3rem;
  right: 1rem;
}

/* Background orbs */
.background-orb {
  position: absolute;
  width: 24rem;
  height: 24rem;
  background: linear-gradient(90deg, #f72585, #720026);
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.1;
  z-index: 0;
}
.orb-top {
  top: -6rem;
  left: -12rem;
  transform: translate(-50%, -50%);
}
.orb-bottom {
  bottom: -6rem;
  right: -12rem;
  transform: translate(50%, 50%);
}
</style>