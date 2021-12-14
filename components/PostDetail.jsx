import React from 'react'
import moment from 'moment'

export const PostDetail = ({post}) => {
    const getContentFragment = (index, text, obj, type) => {
        let modifiedText = text;
    
        if (obj) {
          if (obj.bold) {
            modifiedText = (<b key={index}>{text}</b>);
          }
    
          if (obj.italic) {
            modifiedText = (<em key={index}>{text}</em>);
          }
    
          if (obj.underline) {
            modifiedText = (<u key={index}>{text}</u>);
          }
        }
    
        switch (type) {
          case 'heading-three':
            return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
          case 'paragraph':
            return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
          case 'heading-four':
            return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
          case 'image':
            return (
              <img
                key={index}
                alt={obj.title}
                height={obj.height}
                width={obj.width}
                src={obj.src}
              />
            );
          case 'video':
            <video
                key={index}
                alt={obj.title}
                height={obj.height}
                width={obj.width}
                src={obj.src}
              />
          default:
            return modifiedText;
        }
      };

    return (
        <div className="pb-12 mb-8 mt-8">
            <div className="relative overflow-hidden shadow-md mb-6">
                <img 
                    src={post.featuredimage.url}
                    alt={post.title}
                    className="object-cover object-middle h-96 w-full"
                />
            </div>
            <div className="lg-px-0 mb-5">
                    <h1 className="text-2xl font-semibold">{post.excerpt}</h1>
                    <p className="text-sm">Posted {moment(post.createdAt).fromNow()}</p>
            </div>
            <p className="text-md">
            {post.content.raw.children.map((typeObj, index)=>{
                        const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))

                        return getContentFragment(index, children, typeObj, typeObj.type)
                    })}
            </p>
        </div>
    )
}
export default PostDetail
