/**
 * Công cụ nhận diện thiết bị
 * Dùng để xác định loại thiết bị đang truy cập, phục vụ layout responsive
 */

/**
 * Kiểm tra có phải thiết bị di động không
 * @returns {boolean}
 */
export const isMobile = () => {
  // Kiểm tra qua User-Agent
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  const isMobileUA = mobileRegex.test(userAgent)
  
  // Kiểm tra qua độ rộng màn hình (phương án dự phòng)
  const isMobileWidth = window.innerWidth < 768
  
  return isMobileUA || isMobileWidth
}

/**
 * Kiểm tra có phải máy tính bảng không
 * @returns {boolean}
 */
export const isTablet = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  return /iPad|Android/i.test(userAgent) && window.innerWidth >= 768 && window.innerWidth < 1024
}

/**
 * Kiểm tra có phải thiết bị desktop không
 * @returns {boolean}
 */
export const isDesktop = () => {
  return !isMobile() && !isTablet()
}

/**
 * Kiểm tra có phải trình duyệt WeChat không
 * @returns {boolean}
 */
export const isWeChat = () => {
  const userAgent = navigator.userAgent || ''
  return /MicroMessenger/i.test(userAgent)
}

/**
 * Lấy loại thiết bị
 * @returns {'mobile' | 'tablet' | 'desktop'}
 */
export const getDeviceType = () => {
  if (isMobile()) {
    return 'mobile'
  } else if (isTablet()) {
    return 'tablet'
  } else {
    return 'desktop'
  }
}

/**
 * Theo dõi thay đổi kích thước cửa sổ
 * @param {Function} callback Hàm callback
 * @returns {Function} Hàm hủy theo dõi
 */
export const onResize = (callback) => {
  let ticking = false
  
  const handler = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback(getDeviceType())
        ticking = false
      })
      ticking = true
    }
  }
  
  window.addEventListener('resize', handler)
  
  // Trả về hàm hủy theo dõi
  return () => {
    window.removeEventListener('resize', handler)
  }
}
