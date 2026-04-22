import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { GoPlus } from 'react-icons/go'
import { FiMinus } from 'react-icons/fi'

export default function ProductSkeleton() {
  return (
    <div className="px-17.5 py-10 flex gap-20">
      <Skeleton height={'25rem'} width={'33%'} className="p-10 rounded-2xl" /> {/* image */}
      <div className="w-1/2 space-y-4">
        <Skeleton height={28} width={'70%'} /> {/* title */}
        <Skeleton height={14} width={'50%'} /> {/* rating */}
        <Skeleton height={20} width={'40%'} /> {/* price + sale */}
        <Skeleton height={100} count={3} /> {/* description paragraphs */}
        <div className="flex gap-5 items-center">
          <div className="rounded-full h-12 p-2.5 flex items-center gap-2 w-max border border-gray bg-gray">
            <div className="w-6 h-6 rounded bg-gray-300" /> {/* + icon placeholder */}
            <Skeleton width={20} height={14} inline /> {/* qty 1 */}
            <div className="w-6 h-6 rounded bg-gray-300" /> {/* - icon */}
          </div>
          <Skeleton height={40} width={'100%'} className="rounded-full" /> {/* add to cart btn */}
        </div>
      </div>
    </div>
  )
}
