<template>
  <div class="columns is-multiline is-centered mt-5">
    <div ref="parent" class="column is-8 is-offset-1 is-relative">
      <div class="card_image-1 is-absolute">
        <figure class="image is-32x32">
          <img src="@/assets/img/yellow-ladybird.svg" alt="ladybird" />
        </figure>
      </div>
      <div class="card">
        <div class="card-content mx-6 my-5">
          <div class="card_edit">
            <b-button type="is-purple" icon-right="edit" outlined rounded />
          </div>
          <!-- fist content -->
          <div class="card-content_line is-flex">
            <div
              class="card-content_line-icon has-background-warning is-inline-flex is-justify-content-center px-1 py-1"
            >
              <section class="b-tooltips">
                <b-tooltip
                  label="this is user data"
                  :triggers="['click']"
                  position="is-bottom"
                  type="is-info"
                >
                  <b-icon
                    size="is-small"
                    icon="user"
                    type="is-white"
                    class="is-clickable"
                  ></b-icon>
                </b-tooltip>
              </section>
            </div>
            <div
              class="card-content_line-icon has-background-primary is-inline-flex is-justify-content-center px-1 py-1 ml-2"
            >
              <section class="b-tooltips">
                <b-tooltip
                  label="this is info data"
                  :triggers="['click']"
                  position="is-bottom"
                  type="is-info"
                >
                  <b-icon
                    size="is-small"
                    icon="info"
                    type="is-white"
                    class="is-clickable"
                  ></b-icon>
                </b-tooltip>
              </section>
            </div>
            <p class="has-text-primary ml-3">Lorem ipsum</p>
          </div>
          <!-- second content -->
          <div class="card-content_line is-flex mt-3">
            <div
              class="card-content_line-icon has-background-warning is-inline-flex is-justify-content-center px-1 py-1"
            >
              <b-icon size="is-small" icon="user" type="is-white"></b-icon>
            </div>
            <div
              class="card-content_line-icon has-background-primary is-inline-flex is-justify-content-center px-1 py-1 ml-2"
            >
              <b-icon size="is-small" icon="info" type="is-white"></b-icon>
            </div>
            <p class="has-text-text ml-3">ლორემ იფსუმ</p>
          </div>
          <!-- third content -->
          <div class="card-content_line is-flex mt-3">
            <div
              class="card-content_line-icon has-background-warning is-inline-flex is-justify-content-center px-1 py-1"
            >
              <b-icon size="is-small" icon="user" type="is-white"></b-icon>
            </div>
            <div
              class="card-content_line-icon has-background-primary is-inline-flex is-justify-content-center px-1 py-1 ml-2"
            >
              <b-icon size="is-small" icon="info" type="is-white"></b-icon>
            </div>
            <p class="has-text-text ml-3">
              საბეჭდი და ტიპოგრაფიული ინდუსტრიის უშინაარსო ტექსტია.
            </p>
          </div>
          <!-- share content -->
          <div class="card-content-line is-flex mt-5">
            <div class="card-content_line-share ml-a">
              <div class="buttons">
                <b-button
                  type="is-primary"
                  icon-right="share"
                  outlined
                  rounded
                />
              </div>
            </div>
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
    name: 'WordCard',
    mounted() {
      let parent = this.$refs.parent.clientWidth
      gsap.registerPlugin(MotionPathPlugin)
      gsap.to('.card_image-1', {
        duration: 12,
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
          ],
          autoRotate: true
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    overflow-x: auto;
    &_edit button {
      padding: 1rem 1.2rem;
    }
    &-content {
      &_line {
        &-icon {
          border-radius: 100%;
          max-height: 24px;
        }
        &-share button {
          padding: 1rem 1.2rem;
          &:last-child {
            box-shadow: 2px 2px 6px #7fd1d866;
            border: none;
          }
        }
      }
    }
    &_image-1 {
      left: 50px;
      top: 0;
      z-index: 90;
    }
  }
  .card .b-tooltips {
    .b-tooltip {
      margin-bottom: 1.5em;
      &.is-light-passive .tooltip-content {
        background: whitesmoke;
        color: #c5cbcd;
        box-shadow: 0px 3px 6px #7fd1d866;
      }
    }
  }
</style>
