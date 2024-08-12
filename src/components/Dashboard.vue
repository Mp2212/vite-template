
<template>
 <div class="layer"></div>
<!-- ! Body -->


        <!-- <h2 class="main-title">Home</h2> -->

        
      <div class="container my-4">
        <div class="row g-3">
          <!-- Build Metrics Card -->
          <div class="col-md-4">
            <a href="#" class="card-olympos build-metrics card-shadow">
              <div class="d-flex align-items-center">
                <div class="icon-wrapper">
                  <i class="fas fa-tools"></i>
                </div>
                <div>
                  <h6>Build Metrics</h6>
                  <p>235 Builds</p>
                  <div class="divider"></div>
                  <span class="text-muted">Last month: 220</span>
                </div>
              </div>
            </a>
          </div>

          <!-- Deploy Metrics Card -->
          <div class="col-md-4">
            <a href="#" class="card-olympos deploy-metrics card-shadow">
              <div class="d-flex align-items-center">
                <div class="icon-wrapper">
                  <i class="fas fa-rocket"></i>
                </div>
                <div>
                  <h6>Deploy Metrics</h6>
                  <p>120 Deployments</p>
                  <div class="divider"></div>
                  <span class="text-muted">Last month: 115</span>
                </div>
              </div>
            </a>
          </div>

          <!-- App Inventory Card -->
          <div class="col-md-4">
            <a href="#" class="card-olympos app-inventory card-shadow">
              <div class="d-flex align-items-center">
                <div class="icon-wrapper">
                  <i class="fas fa-box"></i>
                </div>
                <div>
                  <h6>App Inventory</h6>
                  <p>150 Apps</p>
                  <div class="divider"></div>
                  <span class="text-muted">Last month: 145</span>
                </div>
              </div>
            </a>
          </div>

          <!-- App Health Card -->
          <div class="col-md-4">
            <a href="#" class="card-olympos app-health card-shadow">
              <div class="d-flex align-items-center">
                <div class="icon-wrapper">
                  <i class="fas fa-heartbeat"></i>
                </div>
                <div>
                  <h6>App Health</h6>
                  <p>98% Healthy</p>
                  <div class="divider"></div>
                  <span class="text-muted">Last month: 95%</span>
                </div>
              </div>
            </a>
          </div>

          <!-- Release Info Card -->
          <div class="col-md-4">
            <a href="#" class="card-olympos release-info card-shadow">
              <div class="d-flex align-items-center">
                <div class="icon-wrapper">
                  <i class="fas fa-calendar-check"></i>
                </div>
                <div>
                  <h6>Release Info</h6>
                  <p>5 Releases</p>
                  <div class="divider"></div>
                  <span class="text-muted">Last month: 4</span>
                </div>
              </div>
            </a>
          </div>

          <!-- Vulnerability Dashboard Card -->
          <div class="col-md-4">
            <a href="#" class="card-olympos vulnerability-dashboard card-shadow">
              <div class="d-flex align-items-center">
                <div class="icon-wrapper">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <div>
                  <h6>Vulnerability Dashboard</h6>
                  <p>8 Vulnerabilities</p>
                  <div class="divider"></div>
                  <span class="text-muted">Last month: 10</span>
                </div>
              </div>
            </a>
          </div>

          <!-- Horizon Outages Card -->
          <div class="col-md-4">
            <a href="#" class="card-olympos horizon-outages card-shadow">
              <div class="d-flex align-items-center">
                <div class="icon-wrapper">
                  <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div>
                  <h6>Horizon Outages</h6>
                  <p>3 Outages</p>
                  <div class="divider"></div>
                  <span class="text-muted">Last month: 2</span>
                </div>
              </div>
            </a>
          </div>

          <!-- Patching Schedule Card -->
          <div class="col-md-4">
            <a href="#" class="card-olympos patching-schedule card-shadow">
              <div class="d-flex align-items-center">
                <div class="icon-wrapper">
                  <i class="fas fa-calendar-day"></i>
                </div>
                <div>
                  <h6>Patching Schedule</h6>
                  <p>12 Patches</p>
                  <div class="divider"></div>
                  <span class="text-muted">Last month: 10</span>
                </div>
              </div>
            </a>
          </div>

          <!-- Maya Card -->
          <div class="col-md-4">
            <a href="#" class="card-olympos maya card-shadow">
              <div class="d-flex align-items-center">
                <div class="icon-wrapper">
                  <i class="fas fa-robot"></i>
                </div>
                <div>
                  <h6>Maya</h6>
                  <p>20 Tasks</p>
                  <div class="divider"></div>
                  <span class="text-muted">Last month: 18</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>


      <div class="container my-4">
        <div class="card p-4 shadow-sm">
          <div class="card-body">
            <h5 class="card-title mb-3"><i class="fas fa-cogs me-2"></i> Settings</h5>

            <div class="row">
              <!-- AIT Dropdown -->
              <div class="col-md-3">
                <label for="aitDropdown" class="form-label">
                  <i class="fas fa-microchip me-2"></i> AIT
                </label>
                <select class="form-select" id="aitDropdown">
                  <option value="AIT1">AIT 1</option>
                  <option value="AIT2">AIT 2</option>
                  <option value="AIT3">AIT 3</option>
                </select>
              </div>

              <!-- SPK Dropdown -->
              <div class="col-md-3">
                <label for="spkDropdown" class="form-label">
                  <i class="fas fa-toolbox me-2"></i> SPK
                </label>
                <select class="form-select" id="spkDropdown">
                  <option value="SPK1">SPK 1</option>
                  <option value="SPK2">SPK 2</option>
                  <option value="SPK3">SPK 3</option>
                </select>
              </div>

              <!-- Environment Dropdown -->
              <div class="col-md-3">
                <label for="envDropdown" class="form-label">
                  <i class="fas fa-leaf me-2"></i> Environment
                </label>
                <select class="form-select" id="envDropdown">
                  <option value="Development">Development</option>
                  <option value="Staging">Staging</option>
                  <option value="Production">Production</option>
                </select>
              </div>

              <!-- Timeframe Dropdown -->
              <div class="col-md-3">
                <label for="timeframeDropdown" class="form-label">
                  <i class="fas fa-clock me-2"></i> Timeframe
                </label>
                <select class="form-select" id="timeframeDropdown">
                  <option value="Last24Hours">Last 24 Hours</option>
                  <option value="LastWeek">Last Week</option>
                  <option value="LastMonth">Last Month</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

        
        <div class="row">
          <div class="col-lg-12">
    <!-- Card with Chart -->
    <div class="stat-cards-item">
        <div class="chart">
            <canvas id="myChart" aria-label="Card Chart" role="img"></canvas>
        </div>
    </div>
    
    <div class="users-table table-wrapper">
    </div>
</div>
         
        </div>
    
</template>

