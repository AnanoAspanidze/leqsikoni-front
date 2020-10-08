<template>
  <div class="contact">
    <div class="container section contact">
      <div class="columns is-centered is-mobile">
        <div
          class="column is-6-widescreen is-7-desktop is-8-tablet is-12-mobile mt-4 is-relative"
        >
          <!-- img -->
          <div class="contact_image-box-1 is-absolute">
            <figure class="image is-64x64">
              <img src="../assets/img/fly.svg" alt="fly" />
            </figure>
          </div>
          <!-- card -->
          <div class="card px-5">
            <div class="card-header-title">
              <h1
                class="title has-text-primary is-size-4 has-text-weight-light mt-6 mb-5"
              >
                კონტაქტი
              </h1>
            </div>

            <div class="card-content is-family-secondary pb-6">
              <div class="content mb-2">
                Adresse : IMPACT, Chaussée de Vleurgat 195, 1050 Ixelles
              </div>
              <div class="content mb-2">Tél. Machin : +32 484 26 26 26</div>
              <div class="content mb-2">Tél. Truc : +32 484 26 26 26</div>
              <div class="content pb-5">
                Mail :
                <a href="#" class="text-decoration-underline has-text-primary">
                  info@impact.org
                </a>
              </div>
              <div class="content mb-2">IBAN : BE 32 484 26 77 94</div>
              <div class="content mb-2">BIC : BE 32 484 26 77 94</div>
            </div>
          </div>
          <!-- img -->
          <div class="contact_image-box-2 is-absolute">
            <figure class="image is-256x256">
              <img src="../assets/img/lighthouse.svg" alt="lighthouse" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.contact {
  min-height: calc(100vh - 16rem);
  &_image-box-1 {
    left: -60px;
    top: -10px;
  }
  &_image-box-2 {
    right: -256px;
    bottom: -150px;
  }
  @media screen and(max-width: 1024px) {
    &_image-box-2 {
      display: none;
    }
  }
  @media screen and(max-width: 768px) {
    &_image-box-1 {
      display: none;
    }
  }
}
</style>
