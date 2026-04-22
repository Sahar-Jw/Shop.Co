import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SkeletonCard() {
  return (
    <div className='w-70 rounded-2xl'>
      <Skeleton height={'17.5rem'} className='mb-3 rounded-2xl' /> {/* h-70 equivalent */}
      <div>
        <Skeleton width={'80%'} height={16} className='mb-2' /> {/* title */}
        <Skeleton width={'60%'} height={12} className='mb-2' /> {/* rating */}
        <Skeleton width={'50%'} height={12} className='mb-2' /> {/* category */}
        <div className="flex justify-between items-center">
          <Skeleton width={'30%'} height={14} /> {/* price */}
          <Skeleton width={'40%'} height={20} className='rounded-xl px-2 py-1' /> {/* sale badge opt */}
        </div>
      </div>
    </div>
  )
}
