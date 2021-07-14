## QMK Setup Guide (Window 10)

1. Connect Keyboard to the computer.

1. Download and install qmk_toobox

   - link: https://github.com/qmk/qmk_distro_msys/releases/tag/1.4.3

     <img src='./images/qmk_toolbox.png' width='50%' height='50%'>

   - You can see 'HID console connected: ...'.

1. Download and Install qmk_firmware

   - https://docs.qmk.fm/#/newbs_getting_started

     <img src='./images/qmk_msys.png' width='50%'>

   - Run 'qmk setup' and select 'y'.

     <img src='./images/install_qmk_firmware.png' width='50%'>

1. Clone and edit firmware

   - https://github.com/qmk/qmk_firmware

1. Test Your Build Environment

   ```
   qmk compile -kb <keyboard> -km default
   ```

    <img src='./images/compile.png' width='50%'>

   - You can find the .hex file on qmk_firmware directory.

1. Flash your setting using toolbox

   - Open the hex file

     <img src='./images/open.png' width='50%'>

   - Double click the reset button on your keyboard or receiver

     <img src='./images/reset.png' width='50%'>

   - flash

      <img src='./images/done.png' width='50%'>
