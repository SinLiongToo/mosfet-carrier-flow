# MOSFET Carrier Flow

Interactive animation of how MOS transistors work, for learners.

**Live:** https://sinliongtoo.github.io/mosfet-carrier-flow/

## Transistor tab
- NMOS / PMOS toggle
- 5 stages: Off → Depletion → Inversion → Linear (triode) → Saturation, with a guided tour
- VGS / VDS sliders, live current equation with substituted numbers
- Sweep mode: sweep VDS (at fixed VGS) or VGS (at fixed VDS) and watch the operating point trace the I–V curve
- Output (ID–VDS) and transfer (ID–VGS) plots
- **Channel effects:** channel length L, body bias, and toggles for channel-length modulation, body effect, DIBL and velocity saturation, compared against the ideal model

## CMOS inverter tab (`#inverter`)
- Schematic with animated supply current, plus live PMOS and NMOS cross-sections
- Vin slider / sweep, PMOS:NMOS width ratio
- Voltage transfer curve with operating regions A–E and switching point VM, supply-current plot
- Channel effects (L, CLM, DIBL, velocity saturation) with the ideal curve dashed for comparison
- No body effect: each source sits at its body's voltage (VSB = 0)

## Body effect tab (`#body-effect`)
Circuits where a source is *not* tied to its body, with the body effect switchable and an adjustable γ:
- **NAND2** – top NMOS of the stack sits on node X (VSB = VX)
- **NOR2** – lower PMOS of the stack sits on node Y (VBS = VDD − VY)
- **Pass transistor** – animated charging of CL to a weak 1 = VDD − Vth(Vout); optional transmission gate
- **Source follower** – level shift grows with Vin, gain Av = 1/(1 + η)

Each shows the schematic, cross-sections of the affected transistor vs a reference, the response with/without body effect, and Vth vs VSB.

## Current mirror tab (`#current-mirror`)
- **Basic mirror** – diode-connected M1 sets VGS, M2 copies Iref × W2/W1; live cross-sections of both, Iout vs Vout with compliance, output resistance 1/(λ·Iout), channel length, ΔVth mismatch
- **Cascode mirror** – four transistors, node X held still: Rout ≈ gm·ro² vs basic, and the extra headroom it costs
- **Current DAC** – one reference driving 1×/2×/4×/8× branches of unit transistors with random Vth (seeded "new chip"), common-centroid layout view, staircase, INL / DNL

## Power tab (`#power`) – how a chip's supply voltage is set
- **LDO** – error amplifier drives a pass PMOS (live cross-section): Vout = Vref·(1 + R1/R2); animated load-step transient on a scope, dropout and efficiency ≈ Vout/Vin
- **Buck (DC-DC)** – high-side PMOS / low-side NMOS switching (live cross-sections), Vout = D·Vin, PWM ramp/SW/iL/ripple waveforms, efficiency vs load
- **PMIC + DVFS** – two bucks and an LDO in one chip; the CPU writes a VSEL code over I²C and the core rail slews to the new voltage; power breakdown per rail

## 77 GHz radar tab (`#radar`) – frequency synthesizer for ADAS
- **PLL synthesizer** – XO → PFD → CP → LF → VCO (19–20 GHz) → ×4 → 76–81 GHz; ramp generator + ΣΔ change the fractional divide ratio N to make the chirp; MOS-varactor cross-section with C–V and f–V curves; chirp tracking error and phase-noise budget (ref/CP, ΣΔ, VCO) vs loop bandwidth, fref and ΣΔ order
- **FMCW radar** – TX chirp and delayed echo, beat frequency fb = 2RS/c, IF signal, FFT range spectrum (two-target resolution), ΔR = c/2B, Rmax, Doppler

## RF passives tab (`#rf-passives`)
- **S-parameters** – a line section (Zl, θ) between two 50 Ω ports: animated incident / reflected / transmitted waves, standing wave and VSWR, power balance, |S11| and |S21| vs frequency, Smith chart
- **Coupler** – coupled-line directional coupler: four ports with live dB values, backward coupled wave, even / odd-mode cross-sections (Z0e, Z0o), 90° between through and coupled, response vs frequency and output phasors
- **Balun** – LC lattice balun (single-ended → differential): V+ / V− waveforms and phasors, amplitude and phase balance, common mode, match vs load and capacitor error
- **Antenna** – centre-fed dipole: current standing wave, radiating wavefronts, E-plane pattern, induced-EMF input impedance, directivity, S11 vs frequency
- **Waveguide TE / TM** – WR-90 with TE10, TE20, TE01, TE11, TM11, TM21: cross-section E / H fields, side view (propagating or evanescent), ray picture, cutoff, λg, vp / vg, dispersion and mode chart
- **Filters** – LC ladder low-pass / high-pass, Butterworth or Chebyshev 0.5 dB, order 1–7: schematic with element values, input / output waveforms, power transmitted / reflected / lost, |S21| and |S11| vs frequency, group delay, inductor Q; **transmission-line** version: stepped-impedance microstrip low-pass and short-circuited λ/8 stub high-pass (Richards), with their spurious passband / notch; **cavity / waveguide** version: air-filled coaxial rod-and-disc low-pass and a TE10 waveguide high-pass (evanescent below cutoff); **band-pass** in all three: LC resonators, λ/4 short-circuited stubs, and a coupled-cavity filter (coupling-matrix model with k, Qe, unloaded Qu and the field in each cavity)

## MIMO & beams tab (`#mimo`)
- **Beam steering** – N-element phased array: live wavefront field, steering angle, element spacing (grating lobes), phase-shifter bits, Hann taper; beam pattern and element phases
- **Beam switching** – fixed codebook (Butler-matrix-like) vs continuous steering with a car crossing the field of view: selected beam, crossover loss, sweep time
- **MIMO virtual array** – Ntx × Nrx → virtual array (TDM animation), angle spectrum of two close targets with RX only vs MIMO, resolution vs channels
- **Car: one module vs many** – cascaded imaging radar vs five standard radars vs imaging + corners: coverage, front resolution (two cars side by side), chips, modules, rough cost

## PN junction & MOS cap tab (`#pn-junction`)
- **PN junction** – cross-section with fixed ions, majority carriers and injected minority carriers, aligned energy-band diagram (Ec, Ev, split Fermi levels), diode I–V with avalanche/Zener breakdown, junction capacitance
- **MOS capacitor** – accumulation / depletion / inversion, band bending ψs, low- and high-frequency C–V (the curve the radar VCO varactor uses), threshold voltage

## Leakage & FinFET tab (`#leakage-finfet`)
- **Subthreshold leakage** – source–drain barrier with the Boltzmann tail of electrons, 60 mV/dec limit, DIBL, temperature, LVT/SVT/HVT, Ion/Ioff, leakage power
- **Planar → FinFET → GAA** – 3D structures, gate-control map in the channel cross-section, scale length λ, SS and DIBL vs gate length

## Memory tab (`#memory`)
- **SRAM 6T** – read / write / hold cycle with waveforms, read disturb, butterfly curve and SNM, cell and pull-up ratios
- **DRAM 1T1C** – leaking storage capacitor, refresh, charge sharing ΔV = (Vcell − VDD/2)·Cs/(Cs + Cbl), retention vs temperature
- **Flash** – floating-gate cell, Fowler-Nordheim ISPP programming, erase, SLC/MLC/TLC Vth distributions with read references, wear and retention

## Radar receiver tab (`#radar-receiver`)
- **Chain & noise** – antenna → LNA → mixer → IF → ADC, level diagram, Friis noise figure, radar equation, SNR vs range and detection range (car, motorbike, pedestrian)
- **Mixer & IF filter** – LO × echo → beat frequency, high-pass that compensates 1/R⁴, low-pass that sets Rmax
- **SAR ADC** – capacitive DAC and comparator binary search, LSB, SQNR = 6.02N + 1.76 dB, radar dynamic range

## BJT & SiGe HBT tab (`#bipolar`)
- **BJT operation** – emitter injection, base transport, collector sweep, β, gm, Early effect, saturation, Gummel plot
- **SiGe HBT** – Ge-graded base drift field and band diagrams vs Si, base transit time, fT and fmax vs IC, technologies for 77 GHz

## Analog tab (`#analog`)
- **Bandgap reference** – CTAT VBE + K·PTAT ΔVBE, temperature sweep, drift in ppm/°C, best K
- **Differential pair & op-amp** – tail-current steering, mirror load, gain, GBW, Miller compensation, phase margin and step response

## Latch-up & ESD tab (`#latchup-esd`)
- **Latch-up** – parasitic PNPN thyristor in CMOS, trigger and positive feedback, loop gain, guard rings and spacing, power cycle
- **ESD protection** – human-body-model zap into a pin, diodes to the rails and a power clamp vs gate-oxide breakdown

## Process flow tab (`#process-flow`)
- Technology selector: **Bulk CMOS (planar)** (the full flow below), **FinFET** (fin patterning with SAQP/EUV, STI recess and fin reveal, dummy gate, S/D recess + SiP/SiGe epitaxy, replacement metal gate, MOL; views across and along the fin), **FD-SOI** (Smart Cut wafer, BOX, back-gate wells and back bias, raised S/D), **SiGe BiCMOS** (n+ buried layer, epi, deep trench, sinker, SiGe base epitaxy, poly emitter, extrinsic base, plus CMOS), **BCD** (NBL, epi, deep p+ isolation, p-body and n-drift, field oxide, field-plate gate, thick power metal) and **GaN HEMT on Si** (MOCVD buffer/GaN/AlGaN, 2DEG, SiN, isolation implant, ohmic contacts, gate, field plate); each with its own steps, readouts, equations and a comparison plot (W_eff vs fin height, Vth vs back bias, fT vs base width, R_on,sp vs BV for Si/SiC/GaN), and a technology comparison table
- 22 animated steps from a bare wafer to a CMOS inverter: FEOL (STI, wells, gate, LDD/spacers, source/drain, anneal, silicide, contacts, M1), then the BEOL seen zoomed out: six dual-damascene loops (low-k dielectric, via + trench etch, Cu plating, CMP) for M2–M7 with 1×/2×/4× pitches and a thick top metal, aluminium pad and passivation; 24 masks; implant depth profiles and junction depth, Deal-Grove oxidation, wire RC of thin vs thick metal

## Packaging tab (`#packaging`)
- **Wire bond** – back-grinding, dicing, die attach (epoxy, pick-and-place, cure), thermosonic ball/stitch wire bonding with capillary and free-air ball, molding, marking, singulation, final test
- **Flip-chip (RDL + bumps)** – passivation, polyimide, RDL copper plating, UBM, Cu pillar + solder cap, flip and place, reflow, underfill
- **Fan-out WLP (eWLB)** – dies on a carrier, compression molding, debond, fan-out RDL with antenna-in-package, solder balls, singulation
- **2.5D / 3D (CoWoS, HBM)** – silicon interposer with TSVs and fine RDL, chip-on-wafer with micro-bumps, TSV reveal, C4 + substrate, inside an HBM stack, Cu–Cu hybrid bonding; connection density and energy per bit compared from wire bond to hybrid bond
- **Antenna in package (AiP)** – eWLB cross-section with RDL feed and patch antennas radiating through the mold over a λ/4 PCB reflector; top view of how many patches fit around the die at λ0/2 for 3 TX + 4 RX vs package size and frequency
- **Launcher in package (LiP)** – launcher in the RDL coupling into a metallized plastic waveguide antenna with slot radiators, animated TE10 wave; WR-12 cross-section with cutoff, λg and single-mode band
- AiP and LiP views compare antennas on the PCB, AiP and LiP: loss budget (transition, line, antenna efficiency), realized gain and relative radar range vs elements per antenna and chip-to-antenna distance
- **Interconnects at 77 GHz** – bond-wire inductance vs bump: reactance, |S21| vs frequency, I/O count of edge pads vs area bumps

## Yield & WAT tab (`#yield`)
- **Wafer map & WAT sites** – CP bin map of every die next to 5/9/13/21 WAT sites; eight failure signatures (random, edge ring, donut, center, gradient, reticle repeat, scratch, probe-card site); right-hand map of the true ΔVth, the WAT surface fit, a ring-oscillator proxy calibrated on WAT, or the inline defect scan; radial profile, RO calibration, and a diagnosis with edge / per-tester-site / per-reticle-position yields
- **Yield models** – clustered random defects on a wafer vs Poisson, Murphy and negative binomial; dies per wafer and good dies vs die size
- **Screening** – GDBN with a neighbourhood close-up, PAT on IDDQ with robust limits, latent defects caught vs escaped, yield loss vs DPPM
- **Latent defects from the fab** – foreign-material drop, gate-oxide thin spot, via void, etch residue, CMP micro-scratch, mobile ions and plasma (antenna) damage, each animated in three acts (how it forms in the fab, why it passes the wafer test, how it fails in the field); the life of one die through test, burn-in and use; burn-in acceleration AF_T·AF_V (Arrhenius, voltage), bathtub curve with and without burn-in, parameter drift vs the test limit, first-year field ppm

Tabs are grouped into four topics (Devices · Circuits · Power & RF · Fab, package & reliability); the topic selector in the header shows that topic's tabs.

**Find** (magnifier button in the header, Ctrl+K or /) searches every tab at once, open or not: tab and view names, the "How it works" text of every view, glossary terms, tables, lists and controls, in English and 繁體中文 whichever language is shown. Picking a result opens that tab and view, opens the glossary if needed, and highlights the match.

The footer shows when the site was last updated (the deploy time of the page).

Every tab has hover/tap explanations on its readouts and equations, plus an **Explain the terms** panel: a step-by-step walkthrough, live tables computed from the current settings, and a glossary.

Light / dark theme toggle (follows the system by default).

Every plot and animation has a zoom button in its top-right corner.

English / 繁體中文 toggle (globe button in the header, remembered per browser). The `I18N_ZH` table and the small switcher in the head of `index.html` swap the page text, tooltips and canvas labels, so equations and numbers stay live.
