<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Responsive tables</h4>
          </template>
          <template v-slot:headerAction>
            <a class="text-primary float-right" v-b-toggle.collapse-10 role="button">
              <i class="ri-code-s-slash-line" />
            </a>
          </template>
          <template v-slot:body>
            <p>Responsive tables allow tables to be scrolled horizontally with ease. Make any table responsive across all viewports by wrapping a <code class="highlighter-rouge">.table</code> with <code class="highlighter-rouge">.table-responsive</code>. Or, pick a maximum breakpoint with which to have a responsive table up to by using <code class="highlighter-rouge">.table-responsive{-sm|-md|-lg|-xl}</code>.</p>
            <b-collapse id="collapse-10" class="mb-2">
              <div class="card">
                <kbd class="bg-dark">
                </kbd>
              </div>
            </b-collapse>
            <b-table-simple responsive>
              <b-thead>
                <b-th>#</b-th>
                <b-th>Heading</b-th>
                <b-th>Heading</b-th>
                <b-th>Heading</b-th>
                <b-th>Heading</b-th>
                <b-th>Heading</b-th>
                <b-th>Heading</b-th>
                <b-th>Heading</b-th>
                <b-th>Heading</b-th>
                <b-th>Heading</b-th>
              </b-thead>
              <b-tbody>
                <b-tr>
                  <b-th>1</b-th>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>
                    <template>
                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" ><i class="ri-ball-pen-fill m-0"></i></b-button>
                      <b-button variant=" iq-bg-success mr-1 mb-1" size="sm" >Ok</b-button>
                      <b-button variant=" iq-bg-danger" size="sm" ><i class="ri-delete-bin-line m-0"></i></b-button>
                    </template>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th>2</b-th>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                </b-tr>
                <b-tr>
                  <b-th>3</b-th>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                  <b-td>Cell</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../config/pluginInit'
export default {
  name: 'TablesBasic',
  mounted () {
    core.index()
  },
  data () {
    return {
      items: [
      ]
    }
  }
}
</script>
