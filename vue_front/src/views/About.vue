<template>
  <div class="about">
    <div class="container section about">
      <div class="columns is-centered">
        <div ref="parent" class="column is-9 is-relative">
          <div class="about_image-1 is-absolute">
            <figure class="image is-32x32">
              <img src="../assets/img/ladybird.svg" alt="ladybird" />
            </figure>
          </div>
          <div class="card px-5">
            <div class="card-header-title">
              <h1
                class="title has-text-primary is-size-4 has-text-weight-light mt-6"
              >
                რატომ ვიყენებთ მას?
              </h1>
            </div>
            <div class="card-content pb-6 is-family-secondary">
              <div class="content">
                ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია
                მკითხველის ყურადღება მიიზიდოს და დიზაინის აღქმაში ხელი შეუშალოს.
                Lorem Ipsum-ის გამოყენებით ვღებულობთ იმაზე მეტ-ნაკლებად სწორი
                გადანაწილების ტექსტს, ვიდრე ერთიდაიგივე გამეორებადი სიტყვებია
                ხოლმე.
              </div>
              <div class="content">
                შედეგად, ტექსტი ჩვეულებრივ ინგლისურს გავს, მისი წაითხვა კი
                შეუძლებელია.დღეს უამრავი პერსონალური საგამომცემლო პროგრამა და
                ვებგვერდი იყენებს Lorem Ipsum-ს, როგორც დროებით ტექსტს წყობის
                შესავსებად; Lorem Ipsum-ის მოძებნისას კი საძიებო სისტემები ბევრ
                დაუსრულებელ გვერდს გვიჩვენებენ.
              </div>
              <div class="content pb-4">
                წლების მანძილზე ამ ტექსტის უამრავი ვერსია გამოჩნდა, ზოგი
                შემთხვევით დაშვებული შეცდომის გამო, ზოგი კი — განზრახ, ხუმრობით.
              </div>
            </div>
          </div>
          <div class="about_image-2 is-absolute">
            <figure class="image is-256x256 ">
              <img src="../assets/img/lighthouse.svg" class="is-fly" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import gsap from 'gsap'
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

  export default {
    mounted() {
      let parent = this.$refs.parent.clientWidth
      gsap.registerPlugin(MotionPathPlugin)
      gsap.to('.about_image-1', {
        duration: 14,
        ease: 'none',
        yoyo: true,
        repeat: -1,
        rotateX: 0,
        xPercent: -50,
        motionPath: {
          curviness: 0,
          path: [
            { x: 0, y: 0 },
            { x: (parent / 100) * 15, y: 0 },
            { x: (parent / 100) * 25, y: 0 },
            { x: (parent / 100) * 29, y: 0 },
            { x: (parent / 100) * 30, y: 0 }
          ]
        }
      })
    },
    metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'პროექტის შესახებ',
      // all titles will be injected into this template
      titleTemplate: '%s | terms.emis.ge'
    }
  }
</script>

<style lang="scss" scoped>
  .about {
    margin-top: 5vh;
    min-height: calc(100vh - 16rem);

    &_image-1 {
      left: 6%;
      top: 0;
      z-index: 5;
    }
    &_image-2 {
      right: 0;
      top: 85%;
      transform: translateX(80%);
      z-index: 5;
    }

    .ladybird {
      position: absolute;
      width: 30px;
      height: 25px;
      margin-top: 0;
      margin-left: 6rem;
      z-index: 30;
    }

    .is-fly {
      position: fixed;
      margin-left: 2rem;
      height: 170px;
      width: 220px;
    }

    @media screen and(max-width: 1024px) {
      &_image-2 {
        display: none;
      }
    }
  }
</style>
