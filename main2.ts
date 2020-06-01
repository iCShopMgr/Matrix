//% weight=0 color=#3366ff icon="\uf2e0" block="Matrix"
namespace matrix {
  let K = 4096 / 20
	let StartBit = 0.5 * K
	let FullScaleBit = 2.4 * K

	function init() {
		pins.i2cWriteNumber(64, 16, NumberFormat.Int16BE, false)
		pins.i2cWriteNumber(64, 254 * 256 + 123, NumberFormat.Int16BE, false)
		pins.i2cWriteNumber(64, 0, NumberFormat.Int16BE, false)
	}

	init()

  function led(Spin: number, Speed: number) {
		let TM1 = Speed % 256
		let TM2 = Speed / 256
		let CH = (Spin - 1) * 4 + 8
		pins.i2cWriteNumber(64, CH * 256 + TM1, NumberFormat.Int16BE, false)
		pins.i2cWriteNumber(64, (CH + 1) * 256 + TM2, NumberFormat.Int16BE, false)
	}

	function motor(Spin: number, Speed: number) {
		let TM1 = Speed % 256
		let TM2 = Speed / 256
		let CH = (Spin - 1) * 4 + 8
		pins.i2cWriteNumber(64, CH * 256 + TM1, NumberFormat.Int16BE, false)
		pins.i2cWriteNumber(64, (CH + 1) * 256 + TM2, NumberFormat.Int16BE, false)
	}

	export enum Motor_port {
	  //% block="M1"
	  M1 = 1,
    //% block="M2"
    M2 = 2
	}

  export enum Motor_state {
	  //% block="Forward"
	  A1 = 1,
    //% block="Reverse"
    A2 = 2,
    //% block="Stop"
    A3 = 3
	}

	//%block="move Motor at port %mpt %apt|value %number"
	export function move_motor_port(mpt: Motor_port = 1, apt: Motor_state = 1, usevalue: number): void {
		if (usevalue > 100)usevalue = 100
		if (usevalue < 0)usevalue = 0
    usevalue = Math.map(usevalue, 0, 100, 0, 4095)

    if (mpt == 1) {
      if (apt == 1) {
        motor(11, usevalue)
        motor(13, 4095)
        motor(14, 0)
      }
      else if (apt == 2) {
        motor(11, usevalue)
        motor(13, 0)
        motor(14, 4095)
      }
      else {
        motor(11, 0)
        motor(13, 0)
        motor(14, 0)
      }
    } else {
      if (apt == 1) {
        motor(12, usevalue)
        motor(15, 4095)
        motor(16, 0)
      }
      else if (apt == 2) {
        motor(12, usevalue)
        motor(15, 0)
        motor(16, 4095)
      }
      else {
        motor(12, 0)
        motor(15, 0)
        motor(16, 0)
      }
    }
  }

  export enum Led_port {
		//% block="S1"
		S1 = 1,
		//% block="S2"
		S2 = 2,
    //% block="S3"
		S3 = 3,
		//% block="S4"
		S4 = 4,
    //% block="S5"
		S5 = 5,
		//% block="S6"
		S6 = 6
	}

  //%block="rgb led at pin %sepin |to %number|degrees"
  export function rgb_led_pin(sepin: Led_port = 1, usevalue: number): void {
    if (usevalue > 100)usevalue = 100
    if (usevalue < 0)usevalue = 0
    usevalue = Math.map(usevalue, 0, 100, 0, 4095)
	  led(sepin, usevalue)
  }

}
