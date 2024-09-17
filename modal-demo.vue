<div class="container mt-5">
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#searchDownloadModal">
    Search & Download
  </button>

  <!-- Modal -->
  <div class="modal fade" id="searchDownloadModal" tabindex="-1" aria-labelledby="searchDownloadModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="searchDownloadModalLabel">Search & Download</h5>
          <div class="export-icons">
            <i class="fas fa-file-excel"></i>
            <i class="fas fa-file-csv"></i>
            <i class="fas fa-file-pdf"></i>
          </div>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div class="col-md-6 form-group">
                <label for="spk">SPK</label>
                <select class="form-select" id="spk">
                  <option selected>Select SPK</option>
                  <option value="1">SPK 1</option>
                  <option value="2">SPK 2</option>
                  <option value="3">SPK 3</option>
                </select>
              </div>
              <div class="col-md-6 form-group">
                <label for="environment">Environment</label>
                <select class="form-select" id="environment">
                  <option selected>Select Environment</option>
                  <option value="1">Env 1</option>
                  <option value="2">Env 2</option>
                  <option value="3">Env 3</option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 form-group">
                <label for="startDate">Start Date</label>
                <input type="date" class="form-control" id="startDate">
              </div>
              <div class="col-md-6 form-group">
                <label for="endDate">End Date</label>
                <input type="date" class="form-control" id="endDate">
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 form-group">
                <label for="repo">Repo</label>
                <select class="form-select" id="repo">
                  <option selected>Select Repo</option>
                  <option value="1">Repo 1</option>
                  <option value="2">Repo 2</option>
                  <option value="3">Repo 3</option>
                </select>
              </div>
              <div class="col-md-6 form-group">
                <label for="features">Features</label>
                <select class="form-select" id="features">
                  <option selected>Select Features</option>
                  <option value="1">Feature 1</option>
                  <option value="2">Feature 2</option>
                  <option value="3">Feature 3</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Search</button>
        </div>
      </div>
    </div>
  </div>
</div>